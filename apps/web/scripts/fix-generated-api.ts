import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join } from 'path';

const API_DIR = join(process.cwd(), 'src/features/api');

async function getAllTsFiles(dir: string, fileList: string[] = []): Promise<string[]> {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      await getAllTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts') && !file.includes('model')) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

async function fixGeneratedFiles() {
  const tsFiles = await getAllTsFiles(API_DIR);
  let totalFixed = 0;

  console.log(`Found ${tsFiles.length} files to process`);
  if (tsFiles.length > 0) {
    console.log(`First file: ${tsFiles[0]}`);
  }

  for (const filePath of tsFiles) {
    let content = await readFile(filePath, 'utf-8');
    const originalContent = content;
    let fileModified = false;

    // Fix 1: Remove queryClient parameter from useQuery and useMutation calls
    // React Query v5 doesn't accept queryClient as second argument
    const before1 = content;
    content = content.replace(
      /useQuery\((\w+),\s*queryClient\s*\)/g,
      'useQuery($1)',
    );
    if (content !== before1) fileModified = true;

    const before2 = content;
    content = content.replace(
      /useMutation\((\w+),\s*queryClient\s*\)/g,
      'useMutation($1)',
    );
    if (content !== before2) fileModified = true;

    // Fix 2: Fix queryKey assignment - return object with queryKey instead of modifying
    const before3 = content;
    content = content.replace(
      /(const query = useQuery\(queryOptions\)[^;]+;)\s*\n\s*query\.queryKey = queryOptions\.queryKey\s*;\s*\n\s*return query;/g,
      (match, queryLine) => {
        return `${queryLine}

  return { ...query, queryKey: queryOptions.queryKey };`;
      },
    );
    if (content !== before3) fileModified = true;

    // Fix 3: Fix signal handling - pass { signal } instead of signal
    const before4 = content;
    content = content.replace(
      /\({\s*signal\s*}\)\s*=>\s*(\w+)\(\s*signal\s*\)/g,
      '({ signal }) => $1({ signal })',
    );
    if (content !== before4) fileModified = true;

    if (fileModified) {
      await writeFile(filePath, content, 'utf-8');
      totalFixed++;
    }
  }

  console.log(`✅ Fixed ${totalFixed} of ${tsFiles.length} generated API files`);
}

fixGeneratedFiles().catch((error) => {
  console.error('Error fixing generated files:', error);
  process.exit(1);
});


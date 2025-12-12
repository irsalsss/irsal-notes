export interface SharedInputEditorProps {
  label: string;
  defaultValue?: string;
  onEditorChange: (content: string) => void;
  error?: string;
  className?: string;
}

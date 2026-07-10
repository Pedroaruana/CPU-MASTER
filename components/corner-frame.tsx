export default function CornerFrame() {
  const corner = "absolute h-4 w-4 border-black/60";
  return (
    <>
      <span className={`${corner} -left-px -top-px border-l border-t`} />
      <span className={`${corner} -right-px -top-px border-r border-t`} />
      <span className={`${corner} -left-px -bottom-px border-b border-l`} />
      <span className={`${corner} -right-px -bottom-px border-b border-r`} />
    </>
  );
}

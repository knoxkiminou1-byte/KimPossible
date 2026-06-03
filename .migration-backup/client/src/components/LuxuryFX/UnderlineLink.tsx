export default function UnderlineLink({ href, children, className = "", ...props }: any) {
  return (
    <a href={href} className={`relative inline-block group ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}
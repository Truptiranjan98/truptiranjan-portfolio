/* Heading + optional lede + the gradient rule that draws itself on reveal. */
export default function SectionHead({ title, lede, id }) {
  return (
    <div className="sec-head rv">
      <h2 id={id}>{title}</h2>
      {lede ? <p className="lede">{lede}</p> : null}
      <div className="h-rule" />
    </div>
  );
}

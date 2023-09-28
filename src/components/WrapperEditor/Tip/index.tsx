import parse from "html-react-parser";

const Details = ({ description }: any) => {
  return (
    <>
      <div className="ProseMirror">{parse(description)}</div>
    </>
  );
};

export default Details;
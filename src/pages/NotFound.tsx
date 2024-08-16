import notFound from "../assets/notFound1.svg";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex items-center justify-items-center">
      <img src={notFound} alt="This page is not found" className="w-full h-full" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="flex flex-col items-center gap-4">
        <img
          src="https://assets-v2.lottiefiles.com/a/e32661b0-116f-11ee-b9d6-073c345559e2/nNqJaLXZMJ.gif"
          alt="Loading Animation"
          className="w-52 md:w-64 lg:w-72 select-none pointer-events-none"
        />
      </div>
    </div>
  );
}

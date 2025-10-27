import ForgotPassword from './ForgotPassword';

function page() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 bg-muted min-h-svh md:p-10">
      <div className="flex flex-col w-full max-w-sm gap-6">
        <ForgotPassword />
      </div>
    </div>
  );
}

export default page;

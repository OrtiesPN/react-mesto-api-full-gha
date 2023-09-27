import Header from "./Header";
import Main from "./Main";

export default function ContentSection({userEmail, onSignOut, ...props}) {
  return (
    <>
      <Header type="index" userEmail={userEmail} onSignOut={onSignOut} />
      <Main
        type="index"
        {...props}
      />
    </>
  );
}

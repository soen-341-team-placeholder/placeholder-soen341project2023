
export default function HomePage(props) {
    const { isLoggedIn, cookies, darkMode} = props;
  return (
    <div>
      <h1>Welcome to the Placeholder Hub </h1>
      <p>some debug info available in Dev</p>
    </div>
  );
}

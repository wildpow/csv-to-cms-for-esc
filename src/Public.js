import netlifyIdentity from "netlify-identity-widget";

export default function Public() {
  const user = netlifyIdentity.currentUser();

  return (
    <div>
      public <b>{console.log(user)}</b>
    </div>
  );
}

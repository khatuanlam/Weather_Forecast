export default function Page({
   params : {username},
}: {
   params: {username: string}
}) {
    return (
      <>
      <h1>Xin chào {username}</h1>
      </>
    );
}
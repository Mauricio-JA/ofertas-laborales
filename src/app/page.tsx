import LoginForm from "./_components/login/LoginForm";
import { getServerAuthSession } from "~/server/auth";
import HomeAdmin from "./_components/inicio/HomeAdmin";
import HomeEmpresa from "./_components/inicio/HomeEmpresa";
import HomeEstudiante from "./_components/inicio/HomeEstudiante";

// import { CreatePost } from "~/app/_components/create-post";
//import { api } from "~/trpc/server";

export default async function Home() {
  //const hello = await api.post.hello({ text: "from tRPC" });

  const session = await getServerAuthSession();

  console.log(session);
  if (session?.user?.tipoUsuario === 1) return <HomeAdmin />;
  if (session?.user?.tipoUsuario === 2) return <HomeEmpresa />;
  if (session?.user?.tipoUsuario === 3) return <HomeEstudiante />;

  return <LoginForm />;
}

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   //const latestPost = await api.post.getLatest();

//   return (
//     <div className="w-full max-w-xs">
//       {/* {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )} */}
//     </div>
//   );
// }

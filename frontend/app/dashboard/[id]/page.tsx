export default async function dashboard({params}: any) {
    const { id } =await  params;
  return (
    <div> Dashboard for user: {id} </div>
  )}
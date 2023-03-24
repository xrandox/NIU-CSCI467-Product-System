import authorization from "../components/Auth";

const AdminTools = () => {
  return (
    <div>
      <h2>Admin Tools</h2>
      <p>Hello Admin!</p>
    </div>
  );
};

export default authorization(AdminTools, ["admin"]);

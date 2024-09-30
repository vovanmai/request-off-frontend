'use client'
import withAuth from "@/hooks/withAuth";

const UserPage = () => {
  return (
    <div>
      This is user page
    </div>
  );
}

export default withAuth(UserPage)

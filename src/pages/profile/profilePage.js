import React from "react";
import ProfileContainer from "../../containers/profileContainer";
import AuthLayout from "../../Layouts/AuthLayout";
import useRequireAuth from "../../hooks/useRequireAuth";
const ProfilePage = (props) => {
  useRequireAuth();
  return (
    <AuthLayout>
      <ProfileContainer />
    </AuthLayout>
  );
};

export default ProfilePage;

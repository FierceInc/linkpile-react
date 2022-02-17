import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "../components/page";
import { useFirestore } from "../context/firestoreContext";

export default function UserPage() {
  const { userId } = useParams();
  const { getUserDoc } = useFirestore();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);

  useEffect(() => {
    getUserDoc(userId).then((doc) => {
      setData(doc);
      setLoading(false);
    });
  }, [userId, getUserDoc]);

  if (loading) return <div className="loader" />;

  if (!data) return <h1>user not found</h1>;

  return (
    <div className="w-full h-screen">
      <Page
        imgSrc={data.imgSrc}
        profileName={data.profileName}
        about={data.about}
        links={data.links}
        appearance={data.appearance}
      />
    </div>
  );
}

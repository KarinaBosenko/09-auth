import Link from "next/link";
import Image from "next/image";
import css from "./Profile.module.css";
import { getServerMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  return {
    title: `${user.username} - Profile`,
    description: `Profile page of ${user.username}. View user information and account details.`,
    openGraph: {
      title: `${user.username} - Profile`,
      description: `User profile page for ${user.username}`,
      url: "${process.env.NEXT_PUBLIC_SITE_URL}/profile",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Profile page",
        },
      ],
    },
  };
}

async function Profile() {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt={user.username}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}

export default Profile;

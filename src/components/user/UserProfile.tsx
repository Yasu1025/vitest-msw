import { GET_USER } from "@/queries";
import { UserData } from "@/types";
import { useQuery } from "@apollo/client";
import UserCard from "./UserCard";
import StatsContainer from "./StatsContainer";
import Loading from "./Loading";
import UsedLanguages from "../charts/UsedLanguages";
import PopularRepos from "../charts/PopularRepos";
import ForkedRepos from "../charts/ForkedRepos";

type UserProfileProps = {
  userName: string;
};

const UserProfile = ({ userName }: UserProfileProps) => {
  const { data, loading, error } = useQuery<UserData>(GET_USER, {
    variables: { login: userName },
  });
  if (loading) return <Loading />;
  if (error) return <h2 className="text-xl">{error.message}</h2>;
  if (!data) return <h2 className="text-xl">User not found.....</h2>;

  const {
    name,
    bio,
    url,
    repositories,
    avatarUrl,
    followers,
    following,
    gists,
  } = data.user;
  return (
    <div>
      <UserCard avatarUrl={avatarUrl} name={name} bio={bio} url={url} />
      <StatsContainer
        totalRepos={repositories.totalCount}
        followers={followers.totalCount}
        following={following.totalCount}
        gists={gists.totalCount}
      />
      {repositories.totalCount > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          <UsedLanguages repositories={repositories.nodes} />
          <PopularRepos repositories={repositories.nodes} />
          <ForkedRepos repositories={repositories.nodes} />
        </div>
      )}
    </div>
  );
};

export default UserProfile;

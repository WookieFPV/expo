import DocumentationPage from '~/components/DocumentationPage';
import { DevicesImageMasks } from '~/ui/components/Home/resources';
import {
  QuickStart,
  DiscoverMore,
  ExploreAPIs,
  Talks,
  JoinTheCommunity,
} from '~/ui/components/Home/sections';
import { LaunchPartyBanner } from '~/ui/components/LaunchPartyBanner';

function Home() {
  return (
    <DocumentationPage hideTOC hideFromSearch>
      <div className="h-0">
        <DevicesImageMasks />
      </div>
      <LaunchPartyBanner />
      <QuickStart />
      <DiscoverMore />
      <ExploreAPIs />
      <Talks />
      <JoinTheCommunity />
    </DocumentationPage>
  );
}

export default Home;

import * as Tabs from '@radix-ui/react-tabs';
import PostingCard from "./PostingCard";
import "../../styles/Tabs.css"

const PostingTab = ({applicants}) => {

    return (
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="Applicants">
                <Tabs.Trigger className="TabsTrigger" value="tab1">Pending</Tabs.Trigger>
                <Tabs.Trigger className="TabsTrigger" value="tab2">In Interview</Tabs.Trigger>
                <Tabs.Trigger className="TabsTrigger" value="tab3">Accepted</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="tab1">
                {applicants.map((applicant) => (
                    <PostingCard firstName={applicant.firstName}
                                 lastName={applicant.lastName}
                                 postingTitle={applicant.postingTitle}
                                 userBio={applicant.userBio}
                                 canInterview={true}
                                 canAccept={true}
                                 canRescind={true}
                    />
                ))}
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab2">
                {applicants.map((applicant) => (
                    <PostingCard firstName={applicant.firstName}
                                 lastName={applicant.lastName}
                                 postingTitle={applicant.postingTitle}
                                 userBio={applicant.userBio}
                                 canInterview={false}
                                 canAccept={true}
                                 canRescind={true}
                    />
                ))}
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab3">
                {applicants.map((applicant) => (
                    <PostingCard firstName={applicant.firstName}
                                 lastName={applicant.lastName}
                                 postingTitle={applicant.postingTitle}
                                 userBio={applicant.userBio}
                                 canInterview={false}
                                 canAccept={false}
                                 canRescind={true}
                    />
                ))}
            </Tabs.Content>
        </Tabs.Root>
    )
}

export default PostingTab

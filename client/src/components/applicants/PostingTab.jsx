import * as Tabs from '@radix-ui/react-tabs';
import PostingCard from "./PostingCard";
import "../../styles/Tabs.css"

const PostingTab = ({
                        pendingApplicationsList,
                        interviewApplicationsList,
                        acceptedApplicationsList,
                        updateApplicationStatus
                    }) => {

    const handleRefresh = async (studentId, oldStatus, newStatus) => {
        await updateApplicationStatus(studentId, oldStatus, newStatus);
    };

    return (
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="Applicants">
                <Tabs.Trigger className="TabsTrigger" value="tab1">Pending</Tabs.Trigger>
                <Tabs.Trigger className="TabsTrigger" value="tab2">In Interview</Tabs.Trigger>
                <Tabs.Trigger className="TabsTrigger" value="tab3">Accepted</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="tab1">
                {pendingApplicationsList.map((applicant) => (
                    <PostingCard key={applicant.studentId}
                                 firstName={applicant.firstName}
                                 lastName={applicant.lastName}
                                 postingTitle={applicant.postingTitle}
                                 postingId={applicant.postingId}
                                 biography={applicant.biography}
                                 studentId={applicant.studentId}
                                 canInterview={true}
                                 canAccept={true}
                                 canRescind={true}
                                 refreshData={handleRefresh}
                    />
                ))}
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab2">
                {interviewApplicationsList.map((applicant) => (
                    <PostingCard key={applicant.studentId}
                                 firstName={applicant.firstName}
                                 lastName={applicant.lastName}
                                 postingTitle={applicant.postingTitle}
                                 postingId={applicant.postingId}
                                 biography={applicant.biography}
                                 studentId={applicant.studentId}
                                 canInterview={false}
                                 canAccept={true}
                                 canRescind={true}
                                 refreshData={handleRefresh}
                    />
                ))}
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab3">
                {acceptedApplicationsList.map((applicant) => (
                    <PostingCard key={applicant.studentId}
                                 firstName={applicant.firstName}
                                 lastName={applicant.lastName}
                                 postingTitle={applicant.postingTitle}
                                 postingId={applicant.postingId}
                                 biography={applicant.biography}
                                 studentId={applicant.studentId}
                                 canInterview={false}
                                 canAccept={false}
                                 canRescind={true}
                                 refreshData={handleRefresh}
                    />
                ))}
            </Tabs.Content>
        </Tabs.Root>
    )
}

export default PostingTab

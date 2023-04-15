import React, {useState} from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import PostingActions from "./PostingActions";
import classNames from 'classnames';
import {ChevronDownIcon} from '@radix-ui/react-icons';
import '../../styles/Accordion.css'

export default function PostingCard({
                                        firstName,
                                        lastName,
                                        postingTitle,
                                        postingId,
                                        biography,
                                        studentId,
                                        canInterview,
                                        canAccept,
                                        canRescind,
                                        refreshData
                                    }) {

    const [isVisible, setIsVisible] = useState(true);

    const hidePostingCard = () => {
        setIsVisible(false);
    };

    const handleRefresh = async (studentId, oldStatus, newStatus) => {
        await refreshData(studentId, oldStatus, newStatus);
    };

    return (
        isVisible &&
        (<Accordion.Root className="AccordionRoot" type="single" defaultValue="item-1" collapsible>
            <Accordion.Item className="AccordionItem" value="item-1">
                <AccordionTrigger> <span>{firstName} {lastName} - <u>{postingTitle}</u></span></AccordionTrigger>
                <AccordionContent>{biography}</AccordionContent>
                <PostingActions studentId={studentId} postingId={postingId} canInterview={canInterview}
                                canAccept={canAccept}
                                canRescind={canRescind}
                                onHidePostingCard={hidePostingCard}
                                refreshData={handleRefresh}
                />
            </Accordion.Item>
        </Accordion.Root>)
    )

}

const AccordionTrigger = React.forwardRef(({children, className}, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger className={classNames('AccordionTrigger', className)} ref={forwardedRef}>
            {children}
            <ChevronDownIcon className="AccordionChevron" aria-hidden/>
        </Accordion.Trigger>
    </Accordion.Header>
));

const AccordionContent = React.forwardRef(({children, className, ...props}, forwardedRef) => (
    <Accordion.Content
        className={classNames('AccordionContent', className)}
        {...props}
        ref={forwardedRef}
    >
        <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
));
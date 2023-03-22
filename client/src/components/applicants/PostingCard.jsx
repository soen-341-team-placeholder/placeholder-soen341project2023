import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import PostingActions from "./PostingActions";
import classNames from 'classnames';
import {ChevronDownIcon} from '@radix-ui/react-icons';
import '../../styles/Accordion.css'

const PostingCard = ({firstName, lastName, postingTitle, userBio, canInterview, canAccept, canRescind}) => (
    <Accordion.Root className="AccordionRoot" type="single" defaultValue="item-1" collapsible>
        <Accordion.Item className="AccordionItem" value="item-1">
            <AccordionTrigger> <span>{firstName} {lastName} - <u>{postingTitle}</u></span></AccordionTrigger>
            <AccordionContent>{userBio}</AccordionContent>
            <PostingActions canInterview={canInterview} canAccept={canAccept} canRescind={canRescind}/>
        </Accordion.Item>

    </Accordion.Root>
);

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

export default PostingCard
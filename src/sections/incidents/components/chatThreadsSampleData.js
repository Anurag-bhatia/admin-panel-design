const SAMPLE_PREVIEWS = [
    {
        preview: 'Please share the RC and insurance copy, hearing is tomorrow.',
        sender: 'lawyer',
        senderName: 'Vikram Mehra',
    },
    {
        preview: 'Shared the latest challan copy from the portal — please confirm.',
        sender: 'ops',
        senderName: 'Priya Sharma',
        hasAttachment: true,
    },
    {
        preview: 'Court hearing deferred to next Monday due to clerical delay.',
        sender: 'lawyer',
        senderName: 'Rajiv Nair',
    },
    {
        preview: 'Awaiting confirmation from finance before raising the refund.',
        sender: 'ops',
        senderName: 'Arjun Patel',
        isInternalNoteLast: true,
    },
    {
        preview: 'Need a screenshot of the virtual court status, link not opening.',
        sender: 'lawyer',
        senderName: 'Sanya Rao',
    },
    {
        preview: 'Thanks, closing this one — payment receipt attached.',
        sender: 'lawyer',
        senderName: 'Faisal Khan',
        hasAttachment: true,
    },
    {
        preview: 'Will be at the RTO tomorrow morning, keep the dept slip ready.',
        sender: 'ops',
        senderName: 'Priya Sharma',
    },
    {
        preview: 'Checked with RTO, violation code is incorrect. Can we contest?',
        sender: 'lawyer',
        senderName: 'Deepa Iyer',
    },
];
const OWNERS = [null, 'usr-001', 'usr-002', 'usr-003', null, 'usr-001', 'usr-002', null];
export function buildSampleChatThreads(incidents) {
    const now = Date.now();
    return incidents.slice(0, 12).map((incident, idx) => {
        const sample = SAMPLE_PREVIEWS[idx % SAMPLE_PREVIEWS.length];
        const minutesAgo = 2 + idx * 17 + (idx % 3) * 11;
        const lastMessageAt = new Date(now - minutesAgo * 60 * 1000).toISOString();
        const createdMs = new Date(incident.createdAt).getTime();
        const sla = incident.isExpress ? 10 : 42;
        const deadlineMs = createdMs + sla * 24 * 60 * 60 * 1000;
        const tatDaysLeft = Math.ceil((deadlineMs - now) / (24 * 60 * 60 * 1000));
        const unreadCount = sample.sender === 'lawyer' ? (idx % 4 === 0 ? 3 : idx % 3 === 0 ? 1 : 0) : 0;
        return {
            threadId: `thr-${incident.id}`,
            incidentId: incident.id,
            incidentCode: incident.incidentId,
            workType: incident.workType,
            challanType: incident.challanType,
            state: incident.state,
            isExpress: incident.isExpress,
            tatDaysLeft,
            lawyerId: incident.assignedLawyerId,
            ownerId: OWNERS[idx % OWNERS.length],
            lastMessageAt,
            lastMessagePreview: sample.preview,
            lastMessageSender: sample.sender,
            lastMessageSenderName: sample.senderName,
            lastMessageHasAttachment: sample.hasAttachment,
            isInternalNoteLast: sample.isInternalNoteLast,
            unreadCount,
        };
    });
}

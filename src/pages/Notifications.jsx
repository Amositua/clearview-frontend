import React from 'react';
import styled from 'styled-components';
import { Bell, CheckCircle, Clock, FileText, User, RefreshCw } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem 1rem;
  @media (min-width: 640px) {
    padding: 2rem 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 48rem;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 0.5rem;
  overflow: hidden;
`;

const Header = styled.div`
  background: linear-gradient(to right, #2563eb, #1d4ed8);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
`;

const RefreshButton = styled.button`
  color: white;
  padding: 0.5rem;
  border-radius: 9999px;
  transition: background-color 0.2s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Section = styled.div`
  border-bottom: 1px solid #e5e7eb;
  padding: 1.5rem;
`;

const DocumentInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  background-color: #dbeafe;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: #2563eb;
`;

const DocumentDetails = styled.div`
  flex: 1;
`;

const DocumentName = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
`;

const EnvelopeId = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const StatusBadge = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.status?.toUpperCase()) {
      case 'COMPLETED':
        return '#dcfce7';
      case 'SENT':
        return '#dbeafe';
      case 'DECLINED':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.status?.toUpperCase()) {
      case 'COMPLETED':
        return '#16a34a';
      case 'SENT':
        return '#2563eb';
      case 'DECLINED':
        return '#dc2626';
      default:
        return '#4b5563';
    }
  }};
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.75rem;
`;

const SignerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SignerCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9fafb;
  padding: 0.75rem;
  border-radius: 0.5rem;
`;

const SignerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SignerDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignerName = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
`;

const SignerEmail = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const TimelineDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimelineLabel = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const TimelineDate = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
`;

const LastUpdated = styled.div`
  padding: 0.75rem 1.5rem;
  background-color: #f9fafb;
`;

const LastUpdatedText = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
`;

function NotificationPage() {
  const staticNotifications = [
    {
      envelopeId: "bdc9b544-7cc6-4739-a2cd-769a15629fb0",
      status: {
        current: "COMPLETED",
        timestamp: "2024-01-27T17:08:17.98Z"
      },
      document: {
        name: "Sales Agreement.pdf",
      },
      signers: [{
        name: "John Smith",
        email: "john.smith@example.com",
        status: "COMPLETED",
        signedDate: "2024-01-27T18:30:00Z"
      }],
      metadata: {
        created: "2024-01-27T17:08:17.29Z",
      }
    },
    {
      envelopeId: "aef7c123-9dd8-5821-b3ef-458d24731ce1",
      status: {
        current: "SENT",
        timestamp: "2024-01-28T09:15:30.45Z"
      },
      document: {
        name: "Partnership Contract.pdf",
      },
      signers: [{
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        status: "SENT",
        signedDate: null
      }],
      metadata: {
        created: "2024-01-28T09:15:00.00Z",
      }
    },
    {
      envelopeId: "cf45e789-1a2b-3c4d-5e6f-789abc123def",
      status: {
        current: "DECLINED",
        timestamp: "2024-01-26T14:20:45.33Z"
      },
      document: {
        name: "Service Agreement.pdf",
      },
      signers: [{
        name: "Michael Brown",
        email: "m.brown@example.com",
        status: "DECLINED",
        signedDate: null
      }],
      metadata: {
        created: "2024-01-26T13:00:00.00Z",
      }
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Container>
      <ContentWrapper>
        {staticNotifications.map((notification, index) => (
          <Card key={notification.envelopeId} style={{ marginBottom: index !== staticNotifications.length - 1 ? '2rem' : 0 }}>
            <Header>
              <HeaderTitle>
                <Bell size={24} color="white" />
                <Title>Document Status</Title>
              </HeaderTitle>
              <RefreshButton title="Refresh">
                <RefreshCw size={20} />
              </RefreshButton>
            </Header>

            <Section>
              <DocumentInfo>
                <IconWrapper>
                  <FileText size={24} />
                </IconWrapper>
                <DocumentDetails>
                  <DocumentName>{notification.document.name}</DocumentName>
                  <EnvelopeId>Envelope ID: {notification.envelopeId}</EnvelopeId>
                </DocumentDetails>
                <StatusBadge status={notification.status.current}>
                  {notification.status.current}
                </StatusBadge>
              </DocumentInfo>
            </Section>

            <Section>
              <SectionTitle>Signers</SectionTitle>
              <SignerList>
                {notification.signers.map((signer, signerIndex) => (
                  <SignerCard key={signerIndex}>
                    <SignerInfo>
                      <User size={20} color="#9ca3af" />
                      <SignerDetails>
                        <SignerName>{signer.name}</SignerName>
                        <SignerEmail>{signer.email}</SignerEmail>
                      </SignerDetails>
                    </SignerInfo>
                    <StatusBadge status={signer.status}>
                      {signer.status}
                    </StatusBadge>
                  </SignerCard>
                ))}
              </SignerList>
            </Section>

            <Section>
              <SectionTitle>Timeline</SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <TimelineItem>
                  <Clock size={20} color="#9ca3af" />
                  <TimelineDetails>
                    <TimelineLabel>Created</TimelineLabel>
                    <TimelineDate>
                      {formatDate(notification.metadata.created)}
                    </TimelineDate>
                  </TimelineDetails>
                </TimelineItem>
                <TimelineItem>
                  <CheckCircle size={20} color="#9ca3af" />
                  <TimelineDetails>
                    <TimelineLabel>Last Status Update</TimelineLabel>
                    <TimelineDate>
                      {formatDate(notification.status.timestamp)}
                    </TimelineDate>
                  </TimelineDetails>
                </TimelineItem>
              </div>
            </Section>

            <LastUpdated>
              <LastUpdatedText>
                Document {notification.status.current.toLowerCase()}
              </LastUpdatedText>
            </LastUpdated>
          </Card>
        ))}
      </ContentWrapper>
    </Container>
  );
}

export default NotificationPage;
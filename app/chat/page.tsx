"use client"
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { InitializeAssistantResponse, useQuestionsByUserIdQuery } from "@/src/swifthome/api";
import QuestionsCarousel from "@/src/swifthome/components/questions/QuestionsCarousel";
import InitializeUserQuestions from "@/src/swifthome/components/questions/InitializeUserQuestions";
import { useRouter } from 'next/navigation';
import ChatPage from '@/src/swifthome/pages/ChatPage';

const HomePage = () => {
  const { user, authStatus } = useAuthenticator((context) => [context.user, context.authStatus]);
  const navigate = useRouter();

  const [initializeAssistantResponse, setInitializeAssistantResponse] = useState<InitializeAssistantResponse | undefined>(undefined);

  const { data: questions, isLoading } = useQuestionsByUserIdQuery(
    user?.userId ?? "",
  );

  useEffect(() => {
    if (user === undefined || authStatus === 'unauthenticated') {
      navigate.push('/');
    }
  }, [user, navigate, authStatus]);

  if (authStatus === 'configuring' || authStatus === 'unauthenticated' || !user) {
    return (
      <Box id="particles-js" display="flex" justifyContent="center" alignItems="center" height="100vh" zIndex={999}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box id="particles-js" sx={{ height: "100vh", backgroundColor: "black" }} display="flex" justifyContent="center" alignItems="center">
      {initializeAssistantResponse ? (
        <ChatPage
          sessionId={initializeAssistantResponse.sessionId} 
          clientId={initializeAssistantResponse.clientId}
          userId={user?.userId}
        />
      ) : (
        <Grid
          container
          justifyContent="center"
          className="questions-container"
          sx={{
            height:{md:'60vh'},
            zIndex: "1",
            width:"85%",
          }}>

          {questions && questions.length > 0 ? (
            <QuestionsCarousel
              questions={questions}
              setInitializeAssistantResponse={setInitializeAssistantResponse}
            />
          ) : (
            <InitializeUserQuestions userId={user?.userId} />
          )}
        </Grid>
      )}
    </Box>
  );
};

export default HomePage;

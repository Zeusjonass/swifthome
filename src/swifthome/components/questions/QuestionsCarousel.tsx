import { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Question, QuestionOption } from "../../types/question";
import QuestionOptionsSelect from "./QuestionOptionsSelect";
import { InitializeAssistantResponse, initializeAssistantByUserId } from "../../api/api-gateway/assistant";
import { useMutation } from "react-query";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import backgroundImage from "../../images/back.png"
import { useAuthenticator } from '@aws-amplify/ui-react';
//import { deleteThreadAndFile } from "../../api/api-gateway/assistantFile";

interface QuestionsCarouselProps {
  questions: Question[];
  setInitializeAssistantResponse: Dispatch<SetStateAction<InitializeAssistantResponse | undefined>>;
}

const QuestionsCarousel = ({ questions, setInitializeAssistantResponse }: QuestionsCarouselProps) => {
  const { user } = useAuthenticator((context) => [context.user]);

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [submmited, setSubmmited] = useState(false);
  const [answers, setAnswers] = useState(questions.map(question => question.options[0]));
  //const [threadAndFileId, setThreadAndFileId] = useState(localStorage.getItem('threadAndFileId'));

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  // const deleteFileMutation = useMutation(deleteThreadAndFile, {
  //   onSuccess: (response: any) => {
  //     console.log("Removed assistant thread and file", response);
  //     localStorage.removeItem('threadAndFileId');
  //     setThreadAndFileId(null);
  //   },
  //   onError: (error: any) => {
  //     console.error("Error removing assistant file", error);
  //     setThreadAndFileId(null);
  //   },
  // });
  
  // useEffect(() => {
  //   if (threadAndFileId && !deleteFileMutation.isLoading) {
  //     deleteFileMutation.mutate(threadAndFileId);
  //   }
  // }, [threadAndFileId, deleteFileMutation]);
  
  const initializeAssistantMutation = useMutation(initializeAssistantByUserId, {
    onSuccess: (data) => {
      if (data && data.clientId && data.sessionId) {
        setInitializeAssistantResponse(data);
        //localStorage.setItem('threadAndFileId', `${data.threadId}#${data.uploadedFileId}`);
      } else {
        console.error("Invalid Response from initializeAssistant", data);
        setSubmmited(false);
      }
    },
    onError: (error) => {
      console.error("Error in initializeAssistant", error);
      setSubmmited(false);
    },
  });

  const handleSubmit = async () => {
    setSubmmited(true);
    const answeredQuestions = questions.map((question, index) => {
      const answer = answers[index];
      return {
        questionId: question.questionId,
        condition: question.condition,
        field: question.field,
        value: answer.value,
        operation: question.operation
      };
    });

    const clientId = questions[0].clientId;

    const request = {
      clientId: clientId,
      userId: user?.userId,
      answeredQuestions: answeredQuestions
    };
    initializeAssistantMutation.mutate(request);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeQuestion)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeQuestion);
    }

    setActiveQuestion(prevActiveQuestion => prevActiveQuestion + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveQuestion(prevActiveQuestion => prevActiveQuestion - 1);
  };

  const handleReset = () => {
    setActiveQuestion(0);
    setAnswers(questions.map(question => question.options[0]));
  };

  const handleAnswerChange = (selectedOption: QuestionOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[activeQuestion] = selectedOption;
    setAnswers(updatedAnswers);
  };

  return (
    <>
    <Grid
      size={{xs:12, md:4, lg:4}}
      sx={{
        backgroundColor:"white",
        borderRadius:{xs:"5px 5px 0 0", md:"5px 0 0 5px"},
        padding: ".5rem",
        height:{xs:'65%',md:'100%'},
        zIndex: 2
      }}>

    <Box sx={{
      width:'100%', 
      height:'100%', 
      backgroundImage: `url(${backgroundImage.src})`, 
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition:"center",
      display:'flex',
      justifyContent:'center'
      }}>

      <Box sx={{bgcolor:'#00000073', width:'100%', display:'flex',justifyContent:'center', alignItems:'center'}}>
        <Stepper
        orientation="vertical"
        activeStep={activeQuestion}
        sx={{
          alignContent: 'center',
          display: 'grid',
          gridTemplateColumns:'repeat(4, 1fr)',
          width: '70%',
          justifyItems: 'center',
          alignItems: 'center',
          borderRadius: "5px",
          height:"100%",
          padding: "20% 0",
          "& .MuiStepConnector-line, .MuiStepConnector-root": {
            display: "none", 
          }}}>

        {questions.map((question, index) => {
          const stepProps: { completed?: boolean } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step
              sx={{
                backgroundColor: "transparent",
                fontFamily: "Rufina",
                fontSize:"1rem",
                margin:'0.7rem',
                border: '2px solid #777777',
                borderRadius: '50%',
                "&.Mui-completed":{border: "none",bgcolor:'#fff'}

              }}
              key={question.questionId}
              {...stepProps}>
              <StepLabel></StepLabel>
            </Step>

          );
        })}
        </Stepper>
      </Box>
    </Box>
    </Grid>
    {activeQuestion === questions.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>

          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
    ) : (
    <Grid size={{xs:12, md:8, lg:6}}
      sx={{
        backgroundColor:"white",
        borderRadius:{xs:"0 0 5px 5px", md:"0 5px 5px 0"},
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap:"1.2rem",
        textAlign:{xs:'center',md:'start'}
      }}>
        
      <Typography variant="h2" sx={{
        marginTop: '0',
        backgroundColor: 'none',
        color: 'black',
        fontFamily: 'var(--title-font)',
        fontSize: {xs:'1.5rem', md:'2rem'},
        fontWeight: '700',
        width:"100%"
      }}>
        Bienvenido de vuelta. Contesta estas preguntas
      </Typography>
      <Typography variant="subtitle1" sx={{
        marginTop: '0',
        backgroundColor: 'none',
        color: 'black',
        fontFamily: 'var(--text-font)',
        fontSize:{xs:'1rem',md:'1.2rem'},
        textAlign:{xs:'center',md:'left'},
        width:"100%",
        }}>
        Te ayudarán en tu búsqueda, sé preciso
      </Typography>
      <QuestionOptionsSelect
        question={questions[activeQuestion]}
        selectedOption={answers[activeQuestion]}
        onChange={handleAnswerChange}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent:{xs:'center',md:'flex-start'},
          gap:"1rem",
          width: "100%",
          pt: 2
        }}>
        <Button
          disabled={activeQuestion === 0}
          onClick={handleBack}
          sx={{ 
            backgroundColor: "#16273B", 
            color: "white"
          }}
          startIcon={<ArrowBackIosIcon />}
        />
        <Button
          disabled={submmited}
          sx={{ 
            backgroundColor: "#16273B", 
            color: "white" 
          }}
          onClick={activeQuestion === questions.length - 1 ? handleSubmit : handleNext}
          startIcon={activeQuestion === questions.length - 1 ? <ArrowUpwardIcon /> : <ArrowForwardIosIcon />}
        />
      </Box>
    </Grid>
  )}
    </>
  );
};

export default QuestionsCarousel;

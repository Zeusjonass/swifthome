export type Question = {
	userId: string;
    questionId: string;
    pk: string;
    sk: string;
    shortText: string;
    displayText: string;
    condition: string;
    clientId: string;
    field: string;
    options: QuestionOption[];
    operation?: string; 
};

export type AnsweredQuestion = {
    questionId: string;
    condition: string;
    field: string;
    value: number | string;
    operation?: string; 
};

export type QuestionOption = {
    displayText: string;
    value: number | string;
};

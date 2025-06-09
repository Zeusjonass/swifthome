import { z } from 'zod';

export const QuestionOptions = z.object({
    displayText: z.string(),
    value: z.union([z.number(), z.string()]),
    selected: z.boolean().optional(),
});

const Question = z.object({
    userId: z.string(),
    questionId: z.string(),
    shortText: z.string(),
    condition: z.string(),
    sk: z.string().nullable(),
    field: z.string(),
    options: z.array(QuestionOptions),
    pk: z.string().nullable(),
    displayText: z.string(),
    clientId: z.string().optional(),
});

export const QuestionWithSelected = Question.omit({clientId: true, userId: true}).extend({
    selected: z.boolean(),
});

export const BaseProperty = z.object({
    address: z.string(),
    availabilityDate: z.number(),
    bathrooms: z.number(),
    bedrooms: z.number(),
    clientId: z.string(),
    dateConstruction: z.number().nullable(),
    description: z.string(),
    hitch: z.number(),
    image: z.string(),
    link: z.string(),
    location: z.string(),
    lotSize: z.number(),
    monthlyPayment: z.number(),
    pk: z.string().nullable(),
    price: z.number(),
    propertyId: z.union([
    z.number().transform((val) => String(val)),
    z.string(),
  ]), 
    rateCounter: z.number().optional(),
    rateGlobal: z.number().optional(), //para las estrellas
    sk: z.string().nullable(),
    slug: z.string().optional(),
    status: z.string(),
    tags: z.union([z.string().array(), z.object({})]),
    title: z.string(),
    type: z.string(),
});

export const RecommendedProperty = BaseProperty.omit({clientId: true}).extend({
    rate: z.number().optional(),
    reason: z.string().optional(),
});

export const LastQuestionsAsked = z.object({
    createdAt: z.number(),
    message: z.string(),
    properties: z.array(RecommendedProperty),
});

export const DashBoardInfo = z.object({
    questions: z.array(Question),
    properties: z.array(BaseProperty),
    lastQuestionsAsked: z.array(LastQuestionsAsked),
    topPerformingProperties: z.array(BaseProperty),
    averageRecommendation: z.number(),
});

export const Questions = z.array(QuestionWithSelected);

export type DashBoardInfoType = z.infer<typeof DashBoardInfo>;
export type Property = z.infer<typeof BaseProperty>;
export type LastQuestionsAsked = z.infer<typeof LastQuestionsAsked>;
export type Question = z.infer<typeof QuestionWithSelected>;

export interface PropertyFormData {
  address: string;
  title: string;
  location: string;
  lotSize: number;
  price: number;
  hitch: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  monthlyPayment: number;
  type: string;
  link: string;
  image: string;
  availabilityDate: string | number;
  dateConstruction: string | number | null;
}
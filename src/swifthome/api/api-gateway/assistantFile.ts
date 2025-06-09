import axiosInstance from "./_axiosConfig";

export type DeleteThreadAndFileResponse = {
    threadId: string;
    fileId: string;
    deleted: boolean;
}

export const deleteThreadAndFile = async (threadAndFileId: string): Promise<DeleteThreadAndFileResponse> => {
    const [threadId, fileId] = threadAndFileId.split('#');
    const response = await axiosInstance.post('/deleteAssistantFile', { threadId, fileId });
    
    return response.data;
};

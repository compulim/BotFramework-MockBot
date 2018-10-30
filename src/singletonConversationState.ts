import { ConversationState, MemoryStorage } from 'botbuilder';

const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);

export default conversationState;

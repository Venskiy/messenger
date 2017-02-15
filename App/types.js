// @flow

export type ChatType = {
  id: number | string,
  interlocutor_id: number | string,
  interlocutor_username: string,
  is_interlocutor_typing: boolean,
  last_message: string,
  last_message_is_read: boolean,
  last_message_sender_id: number | string,
  last_message_timestamp: string
}

export type Message = {
  text: string,
  sender_username: string,
  timestamp: string,
  is_read: boolean
}

export type Messages = { [key: number | string]: Array<Message> };

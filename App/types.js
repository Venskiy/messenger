// @flow

export type Chat = {
  id: number | string,
  interlocutor_id: number | string,
  interlocutor_username: string,
  is_interlocutor_typing: boolean,
  last_message: string,
  last_message_is_read: boolean,
  last_message_sender_id: number | string,
  last_message_timestamp: string
}

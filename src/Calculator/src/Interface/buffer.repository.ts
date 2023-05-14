export interface IBufferRepository {
  decodeFromBase64(encodedString: string): Buffer;
}
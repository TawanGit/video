import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Video } from './Video';
import { User } from './User';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Video, (video) => video.comments, { onDelete: 'CASCADE' })
  video: Video; // video id

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User; // user id
}

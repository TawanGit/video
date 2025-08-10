import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';

@Entity({ name: 'videos' })
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.videos)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.video, { cascade: true })
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;
}

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Video } from './Video';
import { Comment } from './Comment';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  photo: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.subscribers)
  @JoinTable({
    name: 'subscriptions',
    joinColumn: {
      name: 'subscriber_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'subscribed_to_id',
      referencedColumnName: 'id',
    },
  })
  subscriptions: User[];

  @ManyToMany(() => User, (user) => user.subscriptions)
  subscribers: User[];

  @OneToMany(() => Video, (video) => video.user)
  videos: Video[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}

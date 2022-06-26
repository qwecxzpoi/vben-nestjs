import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    comment: '用户名',
  })
    user_name: string

  @Column({
    nullable: true,
    comment: '昵称',
  })
    nickname: string

  @Column({
    comment: '密码',
  })
    user_pwd: string

  @Column({
    nullable: true,
    comment: '手机号',
  })
    phone?: string

  @Column({
    default: 1,
    comment: '状态。1 - 启用；2 - 禁用',
  })
    state: number
}

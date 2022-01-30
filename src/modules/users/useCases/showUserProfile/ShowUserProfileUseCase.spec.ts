
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ShowUserProfileError } from "./ShowUserProfileError"

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase"

let usersRepositoryInMemory: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let showUserProfileUseCase: ShowUserProfileUseCase

describe("Show User Profile", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory)
  })

  it('should be able to show an user profile', async () => {
    const user = {
      name: 'Tester',
      email: 'test@example.com',
      password: 'test'
    }

    const userCreated =  await createUserUseCase.execute(user)

    const userProfile = await showUserProfileUseCase.execute(userCreated.id as string)

    expect(userProfile).toHaveProperty('id')
  })

  it('should not be able to show an user profile when user not exists', async () => {
    expect(async () => {
      await showUserProfileUseCase.execute('notexistsid')
    }).rejects.toBeInstanceOf(ShowUserProfileError)

  })

})

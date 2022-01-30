import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserError } from "./CreateUserError"
import { CreateUserUseCase } from "./CreateUserUseCase"

let usersRepositoryInMemory: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe("Create User", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to create a new user', async () => {
    const user = {
      name: 'Tester',
      email: 'test@example.com',
      password: 'test'
    }

   const userCreated = await createUserUseCase.execute(user)

   expect(userCreated).toHaveProperty('id')
  })

  it('should not be able to create a new user when user already exists', () => {
    expect(async () => {
      const user = {
        name: 'Tester',
        email: 'test@example.com',
        password: 'test'
      }

     await createUserUseCase.execute(user)
    await createUserUseCase.execute(user)
    }).rejects.toBeInstanceOf(CreateUserError)
  })

})

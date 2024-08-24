import { EntityRepository, Repository, Like } from 'typeorm';
import { Directors } from 'src/entities/director.entity';

@EntityRepository(Directors)
export class DirectorRepository extends Repository<Directors> {
  async findOneWithRelations(id: number): Promise<Directors> {
    return this.findOne({
      where: { id },
      relations: ['movies'],
    });
  }

  async searchByName(name?: string): Promise<Directors[]> {
    const searchCriteria: any = {};
    if (name) {
      searchCriteria.name = Like(`%${name}%`);
    }
    return this.find({ where: searchCriteria });
  }
}

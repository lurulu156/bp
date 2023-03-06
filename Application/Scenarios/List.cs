using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Scenarios
{
  public class List
  {
    public class Query : IRequest<List<Scenario>> { }
    public class Handler : IRequestHandler<Query, List<Scenario>>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }
      public async Task<List<Scenario>> Handle(Query request, CancellationToken cancellationToken)
      {
        return await _context.Scenarios.ToListAsync();
      }
    }
  }
}
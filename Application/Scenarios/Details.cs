using Domain;
using MediatR;
using Persistence;

namespace Application.Scenarios
{
  public class Details
  {
    public class Query : IRequest<Scenario>
    {
      public Guid Id { get; set; }
    }
    public class Handler : IRequestHandler<Query, Scenario>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }
      public async Task<Scenario> Handle(Query request, CancellationToken cancellationToken)
      {
        return await _context.Scenarios.FindAsync(request.Id);
      }
    }
  }
}
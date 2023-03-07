using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Scenarios
{
  public class Details
  {
    public class Query : IRequest<Result<Scenario>>
    {
      public Guid Id { get; set; }
    }
    public class Handler : IRequestHandler<Query, Result<Scenario>>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }
      public async Task<Result<Scenario>> Handle(Query request, CancellationToken cancellationToken)
      {
        var scenario = await _context.Scenarios.FindAsync(request.Id);
        return Result<Scenario>.Success(scenario);
      }
    }
  }
}
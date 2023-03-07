using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Scenarios
{
  public class Edit
  {
    public class Command : IRequest
    {
      public Scenario Scenario { get; set; }
    }
    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }
      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var scenario = await _context.Scenarios.FindAsync(request.Scenario.Id);
        _mapper.Map(request.Scenario, scenario);
        await _context.SaveChangesAsync();
        return Unit.Value;
      }
    }
  }
}
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
  public class ListScenario
  {
    public class Query : IRequest<Result<List<UserScenarioDto>>>
    {
      public string Predicate { get; set; }
      public string Username { get; set; }
    }
    public class Handler : IRequestHandler<Query, Result<List<UserScenarioDto>>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }
      public async Task<Result<List<UserScenarioDto>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var query = _context.ScenarioAttendees
            .Where(x => x.AppUser.UserName == request.Username)
            .OrderBy(x => x.Scenario.DueDate)
            .ProjectTo<UserScenarioDto>(_mapper.ConfigurationProvider)
            .AsQueryable();

        var today = DateTime.UtcNow;

        query = request.Predicate switch
        {
          "past" => query.Where(x => x.DueDate <= today),
          "hosting" => query.Where(x => x.HostUsername == request.Username),
          _ => query.Where(x => x.DueDate >= today)
        };

        var scenarios = await query.ToListAsync();
        return Result<List<UserScenarioDto>>.Success(scenarios);
      }
    }
  }
}
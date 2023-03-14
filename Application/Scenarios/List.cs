using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Scenarios
{
  public class List
  {
    public class Query : IRequest<Result<PagedList<ScenarioDto>>>
    {
      public ScenarioParams Params { get; set; }
    }
    public class Handler : IRequestHandler<Query, Result<PagedList<ScenarioDto>>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;
      private readonly IUserAccessor _userAccessor;
      public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
      {
        _mapper = mapper;
        _context = context;
        _userAccessor = userAccessor;
      }
      public async Task<Result<PagedList<ScenarioDto>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var query = _context.Scenarios
          .Where(x => x.DueDate >= request.Params.StartDate)
          .OrderBy(d => d.DueDate)
          .ProjectTo<ScenarioDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
          .AsQueryable();

        if (request.Params.IsAttend && !request.Params.IsHost)
        {
          query = query.Where(x => x.Attendees.Any(x => x.Username == _userAccessor.GetUsername()));
        }

        if (!request.Params.IsAttend && request.Params.IsHost)
        {
          query = query.Where(x => x.HostUsername == _userAccessor.GetUsername()); 
        }

        return Result<PagedList<ScenarioDto>>.Success(await PagedList<ScenarioDto>
          .CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
      }
    }
  }
}
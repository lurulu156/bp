using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Scenarios
{
  public class List
  {
    public class Query : IRequest<Result<List<ScenarioDto>>> { }
    public class Handler : IRequestHandler<Query, Result<List<ScenarioDto>>>
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
      public async Task<Result<List<ScenarioDto>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var scenarios = await _context.Scenarios
          .ProjectTo<ScenarioDto>(_mapper.ConfigurationProvider, new {currentUsername = _userAccessor.GetUsername()})
          .ToListAsync();

        return Result<List<ScenarioDto>>.Success(scenarios);
      }
    }
  }
}
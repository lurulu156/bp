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
  public class Details
  {
    public class Query : IRequest<Result<ScenarioDto>>
    {
      public Guid Id { get; set; }
    }
    public class Handler : IRequestHandler<Query, Result<ScenarioDto>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;
      private readonly IUserAccessor _userAccessor;
      public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _mapper = mapper;
        _context = context;
      }
      public async Task<Result<ScenarioDto>> Handle(Query request, CancellationToken cancellationToken)
      {
        var scenario = await _context.Scenarios
          .ProjectTo<ScenarioDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
          .FirstOrDefaultAsync(x => x.Id == request.Id);
        return Result<ScenarioDto>.Success(scenario);
      }
    }
  }
}
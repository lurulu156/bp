using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/v0/[controller]")]
  public class AccountController : ControllerBase
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly TokenService _tokenService;
    public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
    {
      _tokenService = tokenService;
      _userManager = userManager;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
      var user = await _userManager.FindByEmailAsync(loginDto.Email);
      if (user == null) return Unauthorized();
      var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
      if (result)
      {
        return new UserDto
        {
          DisplayName = user.DisplayName,
          Username = user.UserName,
          Image = null,
          Token = _tokenService.CreateToken(user)
        };
      }
      return Unauthorized();
    }
  }
}
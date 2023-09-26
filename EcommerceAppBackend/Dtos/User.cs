using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAppBackend.Dtos;

[Table("USERS")]
public partial class User
{
    [Key]
    [Column("uid")]
    public int Uid { get; set; }

    [Column("firstname")]
    [StringLength(100)]
    [Unicode(false)]
    public string Firstname { get; set; } = null!;

    [Column("lastname")]
    [StringLength(100)]
    [Unicode(false)]
    public string Lastname { get; set; } = null!;

    [Column("email")]
    [StringLength(233)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [Column("password")]
    [StringLength(100)]
    [Unicode(false)]
    public string Password { get; set; } = null!;

    [Column("acid")]
    public int Acid { get; set; }

    [Required]
    [Column("u_status")]
    public bool UStatus { get; set; }

    [Column("created_at", TypeName = "datetime")]
    public DateTime CreatedAt { get; set; }

    [ForeignKey("Acid")]
    [InverseProperty("Users")]
    public virtual AccountType? Ac { get; set; }

    [InverseProperty("Ru")]
    public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    [InverseProperty("UidNavigation")]
    public virtual ICollection<UserOrder> UserOrders { get; set; } = new List<UserOrder>();
}
